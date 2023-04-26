import React from 'react';
import { func, any, string, number, bool } from 'prop-types';
import { reduxForm, initialize, change } from 'redux-form/immutable';
import styled from 'styled-components';
import ButtonBull from 'components/ButtonBull';
import ButtonBear from 'components/ButtonBear';
import SelectInput from 'components/SelectInput';
import AmountInput from 'components/AmountInput';
import PeriodsList from 'components/PeriodsList';
import Input from 'components/Input';
import { convertTimeframe } from 'utils/math';
import { notifyError, m } from 'utils/intl';
import { AVAILABLE_TIMEFRAMES } from 'constants/room';
import FormPreloader from './FormPreloader';

const styledButtonBull = {
  width: 150,
  borderRadius: '5px 0 0 5px',
};
const styledButtonBear = {
  width: 150,
  borderRadius: '0 5px 5px 0',
};

const InfoRoomWrapper = styled.div`
  display: flex;
  width: 250px;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  > div {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
`;

const TitleWrapper = styled.div`
  margin-bottom: 10px;
`;

const ValueWrapper = styled.div`
  margin-bottom: 10px;
`;

const betError = (bet, { balance }) => {
  if (bet > 10000) {
    return 'max';
  } else if (bet <= 0) {
    return 'min';
  } else if (bet > balance) {
    return 'insufficient';
  }
  return false;
};

export class NewRoomCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preloader: false,
    };
  }

  componentWillMount() {
    const { team, type } = this.props;
    this.setState({
      team,
      type,
    });
  }

  componentDidMount() {
    const { title, asset, expired, bet, type, dispatch, user } = this.props;
    this.props.getAvailableAssets(
      { timeframe: convertTimeframe(expired) + 60 }
    );
    dispatch(initialize('newRoom', { title, asset, expired, bet, type }));
    if (!title) dispatch(change('newRoom', 'title', user.username));
  }

  /**
   * We need to switch STATE preloader OFF if API returns an error
   *
   * It's a fallback. DON'T REMOVE IT (all existing and EXPECTED errors are already handling in state and betError function)
   *
   * Preloader frontend appearing does NOT depend on createRoomPreloading (only force disappearing)
   */
  componentWillReceiveProps(nextProps) {
    const { createRoomPreloading } = nextProps;
    if (this.props.createRoomPreloading && !createRoomPreloading) {
      this.setState({
        preloader: false,
      });
    }
  }

  setTeam(team) {
    this.setState({
      team,
    });
  }

  setAsset = (asset) => this.props.dispatch({
    type: 'ROOM_MANAGER.SELECT_ASSET',
    payload: { asset, from: Date.now() - 250000, to: Date.now() },
    meta: {
      analytics: {
        type: `SELECT_${asset}`,
        category: 'interface',
      },
    },
  });

  input(field) {
    this.props.dispatch({
      type: `INPUT_${field}`,
      meta: {
        analytics: {
          type: `INPUT_${field}`,
          category: 'interface',
        },
      },
    });
  }

  parseNewRoomData(data) {
    const num = /\d+/g;
    const { expired, bet } = data;
    const rawData = { ...{}, ...data };
    const parsedData = { ...{}, ...data };
    parsedData.expired = convertTimeframe(expired);
    parsedData.bet = parseInt(bet.match(num)[0], 10);
    rawData.bet = bet.indexOf('ᗸ ') > -1 ? bet : 'ᗸ ' + parseInt(bet.match(num)[0], 10); // eslint-disable-line
    rawData.team = this.state.team;
    rawData.type = this.state.team;
    parsedData.team = this.state.team;
    parsedData.type = this.state.team;
    return {
      parsedData,
      rawData,
    };
  }

  render() {
    const { handleSubmit, createNewRoom, availableAssets, user, dispatch } = this.props;
    const submit = handleSubmit((data) => {
      data.bet = data.bet + ''; // eslint-disable-line
      const num = /\d+/g;
      if (!data.bet.match(num)) {
        dispatch(notifyError(m('errors.enterBet')));
        return;
      }
      if (!data.title) {
        dispatch(notifyError(m('errors.enterTitle')));
        return;
      }
      const betNum = parseInt(data.bet.match(num)[0], 10);
      if (betError(betNum, user)) {
        switch (betError(betNum, user)) {
          case 'max':
            dispatch(notifyError((m('errors.maxBet'))));
            break;
          case 'min':
            dispatch(notifyError(m('errors.minBet')));
            break;
          case 'insufficient':
            dispatch(notifyError(m('errors.insufficientFunds')));
            break;
          default:
            break;
        }
      } else {
        createNewRoom(this.parseNewRoomData(data));
        this.setState({ preloader: true });
      }
    });
    return (
      <form onSubmit={submit}>
        {this.state.preloader && <FormPreloader teamBet={this.state.team} />}
        <ButtonBull
          customCss={styledButtonBull}
          newRoom
          onClick={() => this.setTeam(1)}
          type="submit"
          onMouseEnter={() => this.props.toggleSpotlightAnimation(1)}
          onMouseLeave={() => this.props.toggleSpotlightAnimation(0)}
        />
        <InfoRoomWrapper>
          <TitleWrapper>
            <Input
              type="text"
              name="title"
              required
              center
              placeholder={user.username}
              maxLength="85"
              onBlur={() => this.input('title')}
            />
          </TitleWrapper>
          <ValueWrapper>
            <SelectInput
              onChange={this.setAsset}
              id="room_asset"
              options={availableAssets}
              {...this.props}
            />
            <PeriodsList
              options={AVAILABLE_TIMEFRAMES}
              getAvailableAssets={this.props.getAvailableAssets}
              {...this.props}
            />
          </ValueWrapper>
          <AmountInput
            {...this.props}
            placeholder="bet"
          />
        </InfoRoomWrapper>
        <ButtonBear
          customCss={styledButtonBear}
          newRoom
          onClick={() => this.setTeam(2)}
          type="submit"
          onMouseEnter={() => this.props.toggleSpotlightAnimation(2)}
          onMouseLeave={() => this.props.toggleSpotlightAnimation(0)}
        />
      </form>
    );
  }
}

NewRoomCreateForm.propTypes = {
  getAvailableAssets: func,
  createNewRoom: func,
  availableAssets: any,
  user: any,
  handleSubmit: func,
  dispatch: func,
  expired: string,
  title: string,
  bet: string,
  team: number,
  asset: string,
  type: number,
  toggleSpotlightAnimation: func,
  createRoomPreloading: bool,
};

export default reduxForm({
  form: 'newRoom',
})(NewRoomCreateForm);

