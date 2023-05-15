const API_URL = 'https://trainee-gamerbox.herokuapp.com/';

interface IBody {
  identifier: string;
  password: string;
}

class Fetch {
  private static _instance: Fetch;

  public static getInstance() {
    if (!this._instance) {
      this._instance = new Fetch();
    }
    return this._instance;
  }

  async get(url: string) {
    try {
      const response = await fetch(`${API_URL}${url}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  async post(postData: IBody, url: string) {
    try {
      const response = await fetch(`${API_URL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
  async postWithAuth(postData: string, token: string, url: string) {
    try {
      const response = await fetch(`${API_URL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body: `${postData}` }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export { Fetch };
