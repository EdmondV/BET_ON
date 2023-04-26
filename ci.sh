#!/bin/bash

## Build time elapsed
SECONDS=0

## Default to working directory
LOCAL_REPO="."

## Default domain to report
CI_DOMAIN="https://game.tradingroomsdev.com"

## Default env
TR_ENV="dev"

if [ $# -eq 1 ] || [ $# -eq 2 ]; then
  LOCAL_REPO="$1"
  cd "$LOCAL_REPO"
  if (( $? )); then
  		echo $GU_ERROR_NOT_FOUND >&2
		post_to_slack "ERROR" "$GU_ERROR_NOT_FOUND"
		end 1
  fi


  CI_DOMAIN="$2"
  if [ -z "$CI_DOMAIN" ]; then
  	echo "Need to set DOMAIN as second variable"
	end 1
  fi
fi

## Build size
SIZE_BEFORE=$(du -sb build | cut -f1)

# Branch set
CI_BRANCH="$BRANCH"

# User messages
GU_ERROR_FETCH_FAIL="Unable to fetch the remote repository."
GU_ERROR_UPDATE_FAIL="Unable to update the local repository."
GU_ERROR_NO_GIT="This directory has not been initialized with Git."
GU_ERROR_NOT_FOUND="CI directory not found on the server."
GU_INFO_REPOS_EQUAL="The local repository is current. No update is needed."
GU_SUCCESS_REPORT="Update complete."

CI_SUCCESS_REPORT="success"
CI_ERROR="Failed deployment to $CI_DOMAIN.\n"
CI_ERROR_NPM="Can't install npm dependenties."
CI_ERROR_CHARTS="Failed to update three-charts."
CI_ERROR_BUILD="npm failed to build."

function post_to_slack () {
  SLACK_URL=https://hooks.slack.com/services/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
  if [ "$1" = "ERROR" ]; then
  	MESSAGE_COLOR="#a6164f"
  	TEXT_PREFIX=$CI_ERROR
  else
  	MESSAGE_COLOR="#36a64f"
  	TEXT_PREFIX=""
  fi

  if [ "$3" != "GIT" ]; then
  	short=$(git log --pretty=format:"%h" | head -n 1)
  	full=$(git log --pretty=format:"%H" | head -n 1)
  fi

  SIZE_AFTER=$(du -sb build | cut -f1)
  SIZE_RESULT=$(( SIZE_AFTER - SIZE_BEFORE ))
  SIZE_RESULT=${SIZE_RESULT/#-/}
  SIZE_RESULT=$(numfmt --to=iec --suffix=B $SIZE_RESULT)
  if (( SIZE_AFTER > SIZE_BEFORE )); then
  	SIZE_RESULT="↑$SIZE_RESULT"
  else
	if (( SIZE_AFTER < SIZE_BEFORE )); then
  		SIZE_RESULT="↓$SIZE_RESULT"
	else
		SIZE_RESULT="no change"
	fi
  fi
  if [ "$2" = "$CI_SUCCESS_REPORT" ]; then
  	RESULT_TEXT="Build has been crafted in ${SECONDS}sec with size of $(numfmt --suffix=B --to=iec $SIZE_AFTER) (${SIZE_RESULT}) and has been deployed to ${CI_DOMAIN}.\nReview and enjoy."
  else
  	RESULT_TEXT=$2
  fi

  #TODO: Get actual errors from stderr
  SLACK_MESSAGE='{
    "attachments": [
        {
            "color": "'$MESSAGE_COLOR'",
            "title": "Branch: '$CI_BRANCH' Last commit: '$short'",
			"pretext": "Repository <https://bitbucket.org/faunusaff/tr-frontend.v2/branch/'$CI_BRANCH'|[tr-frontend.v2/'$CI_BRANCH']>",
            "title_link": "https://bitbucket.org/faunusaff/tr-frontend.v2/commits/'$full'",
            "text": "'"$TEXT_PREFIX $RESULT_TEXT"'",
            "ts": '$(date +%s)'
        }
    ]
  }'
  curl -X POST --data "payload=$SLACK_MESSAGE" ${SLACK_URL}
}

function build () {
    echo ------------------------------Begin build $(date +"%m-%d-%Y_%H-%M")
    yarn
  	if (( $? )); then
		post_to_slack "ERROR" "$CI_ERROR_NPM"
		end 1
	fi
	if [ "$TR_ENV" = "prod" ]; then
        yarn prod
    else
        yarn dev
    fi
	if (( $? )); then
		post_to_slack "ERROR" "$CI_ERROR_BUILD"
		end 1
	fi
        echo ------------------------------End build $(date +"%m-%d-%Y_%H-%M")
        post_to_slack "SUCCESS" "$CI_SUCCESS_REPORT"
        yarn sync
}

function end () {
	rm -rf .git/updating
	exit $1
}

if [ -d ".git" ]; then
  if [ -z "$GIT_IGNORE" ] && [ -f ".git/updating" ]; then
    echo "Still updating"
    exit 0
  fi
  touch .git/updating

  # update remote tracking branch
  git fetch --tags origin $CI_BRANCH >/dev/null 2>&1

  if (( $? )); then
      echo $GU_ERROR_FETCH_FAIL >&2
      #post_to_slack "ERROR" "$GU_ERROR_FETCH_FAIL"
      end 1
  else
      LOCAL_SHA=$(git rev-parse --verify HEAD)
      REMOTE_SHA=$(git rev-parse --verify FETCH_HEAD)
      if [ -z "$GIT_IGNORE" ] && [ $LOCAL_SHA = $REMOTE_SHA ]; then
          #echo $GU_INFO_REPOS_EQUAL
          end 0
      else
          git reset --hard -q origin/$CI_BRANCH
          if (( $? )); then
              echo $GU_ERROR_UPDATE_FAIL >&2
              post_to_slack "ERROR" "$GU_ERROR_UPDATE_FAIL"
              end 1
          else
              build
              systemctl restart nginx
          fi
      fi
  fi

  rm -f .git/updating
else
  echo $GU_ERROR_NO_GIT >&2
  post_to_slack "ERROR" "$GU_ERROR_NO_GIT" "GIT"
  exit 1
fi
