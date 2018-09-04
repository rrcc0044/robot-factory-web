// const API_URL = `${process.env.REACT_APP_API_URL}`;
const API_URL = ''

const fetchOpts = (method: string, body:any = null) => {
  let option = null;

  if (body instanceof FormData) {
    option = getFormDataOption(method, body);
  } else {
    option = getJsonOption(method, body);
  }

  return option
};

const getJsonOption = (method: string, body:any) => {
  return Object.assign({},
    {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    },
    body ? { body: JSON.stringify(body) } : {}
  );
};

const getFormDataOption = (method:string, body:any) => {
  return Object.assign({},
    {
      method,
      headers: {
        Accept: "application/json"
      }
    },
    body ? { body: body } : {}
  );
};

const API = {
  get: (url: string) => fetch(`${API_URL}${url}`, fetchOpts("GET")),
  post: (url: string, data: any) => fetch(`${API_URL}${url}`, fetchOpts("POST", data)),
  put: (url:string, data: any) => fetch(`${API_URL}${url}`, fetchOpts("PUT", data)),
  delete: (url: string) => fetch(`${API_URL}${url}`, fetchOpts("DELETE"))
};

export default API;
