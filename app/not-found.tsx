import Container from "@/components/container";
import CardNotFound from "@/components/NotFound/card";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for is not found!",
};

const NotFound = () => {
  return (
    <Container center>
      <CardNotFound />
    </Container>
  );
};

export default NotFound;
