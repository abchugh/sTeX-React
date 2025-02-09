import * as flams from './types';

export class FLAMSServer {
  _url:string;
  constructor(url:string) {
    this._url = url;
  }

  get url(): string {
    return this._url;
  }

  /// requires login
  async apiSettings(): Promise<flams.Settings | undefined> {
    const ret = await this.postRequest<{},[flams.Settings,any,any] | undefined>("api/settings",{});
    if (ret) {
      const [settings,_] = ret;
      return settings;
    }
  }


  /// sets a cookie, i.e. only makes sense in a client-side context
  async apiLogin(username:string,password:string): Promise<void> {
    await this.postRequest("api/login",{username:username,password:password});
  }

  async apiLoginState(): Promise<flams.LoginState | undefined> {
    return await this.postRequest("api/login_state",{});
  }

  async backendGroupEntries(in_entry?:string): Promise<[flams.ArchiveGroup[],flams.Archive[]] | undefined> {
    return await this.postRequest("api/backend/group_entries",{in:in_entry});
  }

  async backendArchiveEntries(archive:string,in_path?:string): Promise<[flams.Directory[],flams.File[]] | undefined> {
    return await this.postRequest("api/backend/archive_entries",{archive:archive,path:in_path});
  }

  async index(): Promise<[flams.Institution[],flams.ArchiveIndex[]] | undefined> {
    return await this.postRequest("api/index",{});
  }

  async query(sparql:String): Promise<any> {
    return await this.postRequest("api/backend/query",{query:sparql});
  }

  async contentDocument(uri:flams.DocumentURIParams):Promise<[flams.DocumentURI,flams.CSS[],string] | undefined> {
    const arg = (uri instanceof flams.DocumentURI)? { uri: uri.uri } : uri;
    const ret = <[string,flams.CSS[],string] | undefined> await this.getRequest("content/document",arg);
    if (ret) {
      const [s,c,h] = ret;
      return [new flams.DocumentURI(s),c,h];
    }
  }

  async contentFragment(uri:flams.URIParams):Promise<[flams.CSS[],string] | undefined> {
    const arg = (uri instanceof flams.DocumentURI)? { uri: uri.uri } : uri;
    return await this.getRequest("content/fragment",arg);
  }

  async contentToc(uri:flams.DocumentURIParams):Promise<[flams.CSS[],flams.TOCElem[]] | undefined> {
    const arg = (uri instanceof flams.DocumentURI)? { uri: uri.uri } : uri;
    return await this.getRequest("content/toc",arg);
  }

  private async getRequest<TRequest extends Record<string,unknown>, TResponse>(endpoint:string,request:TRequest): Promise<TResponse | undefined> {
    const encodeParam = (v:unknown):string => {
      return encodeURIComponent(JSON.stringify(v));
    };
    const buildQueryString = (obj:unknown,prefix = ''): string[] => {
      const params: string[] = [];
      if (obj === null || obj === undefined) { return params; }
      if (Array.isArray(obj)) {
        if (prefix) {
          params.push(`${prefix}=${encodeParam(obj)}`);
        }
      } else if (typeof obj === 'string') {
        params.push(`${prefix}=${encodeURIComponent(obj)}`);
      } else if (typeof obj === 'object' && !(obj instanceof Date)) {
        if (prefix) {
          params.push(`${prefix}=${encodeParam(obj)}`);
        } else {
          for (const [key,value] of Object.entries(obj)) {
            const newPrefix = prefix ? `${prefix}[${key}]` : key;
            params.push(...buildQueryString(value,newPrefix));
          }
        }
      } else {
        const value = obj instanceof Date ? obj.toISOString() : obj;
        params.push(`${prefix}=${encodeParam(value)}`);
      }
      return params;
    };

    const queryString = buildQueryString(request).join('&');
    const url = `${this._url}/${endpoint}${queryString ? '?' + queryString : ''}`;
    console.log("Calling",url);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    if (response.ok) {
      const j = await response.json();
      console.log("Response",url,":",j);
      return j as TResponse;
    }
  }

  private async postRequest<TRequest extends Record<string,unknown>, TResponse>(endpoint:string,request:TRequest): Promise<TResponse | undefined> {
    const formData = new URLSearchParams();
    const appendToForm = (obj:unknown, prefix=''): void => {
      if (Array.isArray(obj)) {
        obj.forEach((v,i) => appendToForm(v,`${prefix}[${i}]`));
      } else if (obj instanceof Date) {
        formData.append(prefix, obj.toISOString());
      } else if (obj && typeof obj === 'object' && !(obj instanceof File)) {
        for (const [key,value] of Object.entries(obj)) {
          const newPrefix = prefix ? `${prefix}[${key}]` : key;
          appendToForm(value,newPrefix);
        }
      } else if (obj !== undefined && obj !== null) {
        formData.append(prefix, String(obj));
      }
    };
    appendToForm(request);
    console.log(`Calling ${this._url}/${endpoint} with body`,formData);
    const response = await fetch(`${this._url}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    });

    if (response.ok) {
      const j = await response.json();
      console.log(`Response ${this._url}/${endpoint} with body:`,j);
      return j as TResponse;
    }
  }
}