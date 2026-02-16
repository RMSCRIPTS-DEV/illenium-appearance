import { mocks } from './mock';

interface Events {
  [key: string]: any;
}

declare function GetParentResourceName(): string;

const events: Events = {};

async function fetchWithTimeout(resource: string, options: any = {}): Promise<Response> {
  const { timeout = 15000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);

  return response;
}

async function fetchWithRetries(resource: string, options: any = {}, retries: number = 1): Promise<Response> {
  try {
    return await fetchWithTimeout(resource, options);
  } catch (error: any) {
    if (error.name === 'AbortError' && retries > 0) {
      console.log(`Request Failed due to timeout: ${resource}`);
      return fetchWithRetries(resource, options, retries - 1);
    }
  }

  return new Response(null, {
    status: 408,
    statusText: 'Request Timeout',
    headers: {
      'Content-Length': '0',
    },
  });
}

async function post(event: string, data = {}): Promise<any> {
  if (!import.meta.env.PROD) {
    if (!mocks[event]) return;

    return mocks[event](data);
  }

  const url = `https://${GetParentResourceName()}/${event}`;

  const response = await fetchWithRetries(
    url,
    {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data),
    },
    5,
  );

  return response.json();
}

function onEvent(type: string, func: any): void {
  if (events[type]) {
    console.log(`[Nui] Event ${type} is already declared.`);
    return;
  }
  events[type] = func;
}

function emitEvent(type: string, payload: any): void {
  window.dispatchEvent(
    new MessageEvent('message', {
      data: { type, payload },
    }),
  );
}

const Nui = { post, onEvent, emitEvent };

export default Nui;

export const EventListener = () => {
  window.addEventListener('message', (e: MessageEvent) => {
    if (!events[e.data.type]) return;
    events[e.data.type](e.data.payload);
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'd') {
      Nui.post('rotate_right');
    } else if (e.key === 'a') {
      Nui.post('rotate_left');
    }
  });

  return null;
};
