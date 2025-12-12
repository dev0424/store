import React from "react";
import Section from "@modules/account/components/registration-form/components/section";
import Grid from "@modules/account/components/registration-form/components/grid";
import { SIGN_UP_SCHEMA } from "@modules/account/components/registration-form/schema";
import { FileUpload } from "@modules/common/components/file-upload";

const Documents = () => {
  return (
    <Section title="Documents">
      <Grid>
        <FileUpload
          name="documents.rib"
          label="RIB"
          accept={{ "application/pdf": [] }}
          rules={SIGN_UP_SCHEMA.documents.rib}
          maxSizeMB={5}
          required
        />
        <FileUpload
          name="documents.kbis"
          label="KBIS"
          accept={{ "application/pdf": [] }}
          rules={SIGN_UP_SCHEMA.documents.kbis}
          maxSizeMB={5}
          required
        />
      </Grid>
    </Section>
  );
};

export default Documents;
