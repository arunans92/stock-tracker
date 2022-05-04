import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "./layout.css"

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { msalConfig } from "../authConfig";
import { CustomNavigationClient } from "../utils/NavigationClient";

import AuthenticatedLayout from "./authenticatedLayout";
import UnAuthenticatedLayout from "./unAuthenticatedLayout";

const msalInstance = new PublicClientApplication(msalConfig);


const MainContent = ({ children }) => {
  const data = useStaticQuery(graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title,
        siteUrl
      }
    }
  }
  `)

  const navigationClient = new CustomNavigationClient();
  msalInstance.setNavigationClient(navigationClient);

  return (
    <MsalProvider instance={msalInstance}>
      <AuthenticatedTemplate>
        <AuthenticatedLayout children={children} data={data.site.siteMetadata ? data.site.siteMetadata : null} />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <UnAuthenticatedLayout data={data.site.siteMetadata ? data.site.siteMetadata : null} />
      </UnauthenticatedTemplate>
    </MsalProvider>
  );
};


MainContent.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainContent
