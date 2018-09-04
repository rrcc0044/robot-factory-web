import API from '../../utils/api';

export const getRobotsForQA = async () => {
  try {
    const response = await API.get('/api/v1/robots');
    const json = await response.json();

    if ( !response.ok ) {
      throw json;
    }

    return json;

  } catch (err) {
    throw err;
  }
};

export const postProcessRobots = async (payload: any) => {
  try {
    const response = await API.post('/api/v1/robots/process', payload);
    const json = await response.json();

    if ( !response.ok) {
      throw payload;
    }

    return json;
  } catch (err) {
    throw err;
  }
}

export const deleteRecycleRobots = async (payload: any) => {
  try {
    const response = await API.post('/api/v1/robots/recycle', payload);

    if ( !response.ok) {
      throw payload;
    }

    return payload;
  } catch (err) {
    throw err;
  }
}

export const extinguishFireFromRobot = async (payload: any) => {
  try {
    const response = await API.put(`/api/v1/robots/${payload.id}/extinguish`, {});
    const json = await response.json();

    if ( !response.ok) {
      throw payload;
    }

    return json;
  } catch (err) {
    throw err;
  }
}

export const shipRobots = async (payload: any) => {
  try {
    const response = await API.post(`/api/v1/shipments`, payload)
    if ( !response.ok) {
      throw payload;
    }
    return payload;
  } catch (err) {
    throw err;
  }
}
