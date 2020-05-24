declare var contexts: any;

export class Utils {
    public spUrl: string;

    constructor() {
    this.spUrl = contexts.pageContext.web.absoluteUrl;
  }

  public getItems(list, query = null, subsite = null) {
    return contexts.spHttpClient
      .get(
        this.spUrl +
          (subsite ? "/" + subsite : "") +
          `/_api/web/lists/GetByTitle('${list}')/Items${query ? query : ""}`,
        contexts.spHttpClient.configuration
      )
      .then(response => response.json());
  }

  public getItem(list, itemId, query = null, subsite = null) {
    return contexts.spHttpClient
      .get(
        this.spUrl +
          (subsite ? "/" + subsite : "") +
          `/_api/web/lists/GetByTitle('${list}')/Items(${itemId})${
            query ? query : ""
          }`,
        contexts.spHttpClient.configuration
      )
      .then(response => response.json());
  }

  public addItem(list, item, subsite = null) {
    return contexts.spHttpClient
      .post(
        this.spUrl +
          (subsite ? "/" + subsite : "") +
          `/_api/web/lists/GetByTitle('${list}')/Items`,
        contexts.spHttpClient.configuration,
        {
          headers: {
            Accept: "application/json;odata=verbose",
            "Content-type": "application/json;odata=verbose",
            "odata-version": ""
          },
          body: JSON.stringify(item)
        }
      )
      .then(() => true);
  }

  public updateItem(list, itemId, item, subsite = null) {
    return contexts.spHttpClient
      .post(
        this.spUrl +
          (subsite ? "/" + subsite : "") +
          `/_api/web/lists/GetByTitle('` + list + `')/Items(${itemId})`,
        contexts.spHttpClient.configuration,
        {
          headers: {
            Accept: "application/json;odata=nometadata",
            "Content-type": "application/json;odata=nometadata",
            "odata-version": "",
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
          },
          body: JSON.stringify(item)
        }
      )
      .then(() => true);
  }

  public deleteItem(list, itemId, subSite = null) {
    return contexts.spHttpClient
      .post(
        this.spUrl +
          (subSite ? "/" + subSite : "") +
          `/_api/web/lists/GetByTitle('${list}')/Items(${itemId})`,
        contexts.spHttpClient.configuration,
        {
          headers: {
            Accept: "application/json;odata=nometadata",
            "Content-type": "application/json;odata=verbose",
            "odata-version": "",
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
          }
        }
      )
      .then(() => true);
  }
}

export var utils = new Utils();
