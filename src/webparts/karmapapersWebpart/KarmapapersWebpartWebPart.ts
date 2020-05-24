import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import * as strings from 'KarmapapersWebpartWebPartStrings';
import KarmapapersWebpart from './components/KarmapapersWebpart';
import { IKarmapapersWebpartProps } from './components/IKarmapapersWebpartProps';

export interface IKarmapapersWebpartWebPartProps {
  description: string;
}

export default class KarmapapersWebpartWebPart extends BaseClientSideWebPart <IKarmapapersWebpartWebPartProps> {

  public render(): void {
    this.loadSPJSOMScripts();
    this.context.spHttpClient['configuration'] = SPHttpClient.configurations.v1;
    window['contexts'] = this.context;
    const element: React.ReactElement<IKarmapapersWebpartProps> = React.createElement(
      KarmapapersWebpart,
      {
        description: this.properties.description
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private loadSPJSOMScripts() {
    SPComponentLoader.loadScript('/_layouts/15/init.js', {
      globalExportsName: '$_global_init'
    })
    .then((): Promise<{}> => {
      return SPComponentLoader.loadScript('/_layouts/15/MicrosoftAjax.js', {
        globalExportsName: 'Sys'
      });
    })
    .then((): Promise<{}> => {
      return SPComponentLoader.loadScript('/_layouts/15/ScriptResx.ashx?name=sp.res&culture=en-us', {
        globalExportsName: 'Sys'
      });
    })
    .then((): Promise<{}> => {
      return SPComponentLoader.loadScript('/_layouts/15/SP.Runtime.js', {
        globalExportsName: 'SP'
      });
    })
    .then((): Promise<{}> => {
      return SPComponentLoader.loadScript('/_layouts/15/SP.js', {
        globalExportsName: 'SP'
      });
    })
    .then((): Promise<{}> => {
      return SPComponentLoader.loadScript('/_layouts/15/sp.init.js', {
        globalExportsName: 'SP'
      });
    })
    .then((): Promise<{}> => {
      return SPComponentLoader.loadScript('/_layouts/15/sp.ui.dialog.js', {
        globalExportsName: 'SP'
      });
    });
  }
  
}
