const xhrGet = (path, onSuccess, onFailure, body = '') => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status <= 299) {
      onSuccess(xhr);
      return;
    }
    onFailure(xhr);
  }

  xhr.open('GET', path);
  xhr.send(body);
};

const xhrPost = (path, onSuccess, onFailure, body = '', type = 'form') => {
  const types = {
    'form': "application/x-www-form-urlencoded",
    'text': 'text/plain',
    'html': 'text/html'
  }

  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status <= 299) {
      onSuccess(xhr);
      return;
    }
    onFailure(xhr);
  }

  xhr.open('POST', path);
  xhr.setRequestHeader('content-type', types[type]);
  xhr.send(body);
};
