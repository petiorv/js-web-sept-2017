
const appKey = 'kid_Bk2jtkPyf';
const appSecret = 'e6becd9881124877bac235752a67040a';
const hostUrl = 'https://baas.kinvey.com';

let reqHandler = {
  login: (payload) => {
    return fetch(`${hostUrl}/user/${appKey}/login`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${appKey}:${appSecret}`),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => {
      return res.json()
    })
  },
  register: (payload) => {
    return fetch(`${hostUrl}/user/${appKey}`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${appKey}:${appSecret}`),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => {
      return res.json()
    })
  },
  getPosts: () => {
    return fetch(`${hostUrl}/appdata/${appKey}/posts?query={}&sort={"_kmd.ect": -1}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Kinvey ' + localStorage.getItem('token')
      }
    }).then(res => {
      return res.json()
    })
  },
  postTime: (dateIsoFormat) => {
    let diff = new Date - (new Date(dateIsoFormat));
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);
    function pluralize(value) {
        if (value !== 1) return 's';
        else return '';
    }
  },
  addPost: (payload) => {
    return fetch(`${hostUrl}/appdata/${appKey}/posts`, {
      method: 'POST',
      headers: {
        'Authorization': 'Kinvey ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => {
      return res.json()
    })
  },
  getPostDetails: (id) => {
    return fetch(`${hostUrl}/appdata/${appKey}/posts/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Kinvey ' + localStorage.getItem('token')
      }
    }).then(res => {
      return res.json()
    })
  },
  getPostComments: (id) => {
    return fetch(`${hostUrl}/appdata/${appKey}/comments?query={"postId":"${id}"}&sort={"_kmd.ect": -1}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Kinvey ' + localStorage.getItem('token')
      }
    }).then(res => {
      return res.json()
    })
  },
  addComment: (payload) => {
    return fetch(`${hostUrl}/appdata/${appKey}/comments`, {
      method: 'POST',
      headers: {
        'Authorization': 'Kinvey ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => {
      return res.json()
    })
  },
  deleteComment: (payload) => {
    return fetch(`${hostUrl}/appdata/${appKey}/comments/${payload}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Kinvey ' + localStorage.getItem('token')
      }
    }).then(res => {
      return res.json()
    })
  },
  editPost: (payload) => {
    return fetch(`${hostUrl}/appdata/${appKey}/posts/${payload._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Kinvey ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => {
      return res.json()
    })
  },
  deletePost: (payload) => {
    return fetch(`${hostUrl}/appdata/${appKey}/posts/${payload}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Kinvey ' + localStorage.getItem('token')
      }
    }).then(res => {
      return res.json()
    })
  },
  logout: () => {
    return fetch(`${hostUrl}/user/${appKey}/_logout`, {
      method: 'POST',
      headers: {
        'Authorization': 'Kinvey ' + localStorage.getItem('token')
      }
    }).then(res => {
      return res.json()
    })
  },
  getMyPosts: () => {
    let username = localStorage.getItem('username')
    let token = localStorage.getItem('token')
    return fetch(`${hostUrl}/appdata/${appKey}/posts?query={"author":"${username}"}&sort={"_kmd.ect": -1}`, {
        method: 'GET',
        headers: {
          Authorization: 'Kinvey ' + token
        }
    }).then(data => {
      return data.json()
    })
  }
}

export default reqHandler