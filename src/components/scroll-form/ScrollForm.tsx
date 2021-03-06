import React, { Children } from "react";
import { useTranslation } from "react-i18next";
import {
  Grid,
  GridItem,
  JumpLinks,
  JumpLinksItem,
  PageSection,
} from "@patternfly/react-core";

import { FormPanel } from "./FormPanel";
import "./scroll-form.css";

type ScrollFormProps = {
  sections: string[];
  children: React.ReactNode;
};

// This must match the page id created in App.tsx unless another page section has been given hasScrollableContent
const mainPageContentId = "#kc-main-content-page-container";

const spacesToHyphens = (string: string): string => {
  return string.replace(/\s+/g, "-");
};

export const ScrollForm = ({ sections, children }: ScrollFormProps) => {
  const { t } = useTranslation("common");

  const nodes = Children.toArray(children);
  return (
    <Grid hasGutter>
      <GridItem span={8}>
        {sections.map((cat, index) => (
          <FormPanel scrollId={spacesToHyphens(cat)} key={cat} title={cat}>
            {nodes[index]}
          </FormPanel>
        ))}
      </GridItem>
      <GridItem span={4}>
        <PageSection className="kc-scroll-form--sticky">
          <JumpLinks
            isVertical
            // scrollableSelector has to point to the id of the element whose scrollTop changes
            // to scroll the entire main section, it has to be the pf-c-page__main
            scrollableSelector={mainPageContentId}
            label={t("jumpToSection")}
            offset={100}
          >
            {sections.map((cat) => (
              // note that JumpLinks currently does not work with spaces in the href
              <JumpLinksItem key={cat} href={`#${spacesToHyphens(cat)}`}>
                {cat}
              </JumpLinksItem>
            ))}
          </JumpLinks>
        </PageSection>
      </GridItem>
    </Grid>
  );
};
