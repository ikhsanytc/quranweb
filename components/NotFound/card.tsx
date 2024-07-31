"use client";
import Button from "@/components/ui/button";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
const CardNotFound = () => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Not Found</CardTitle>
      </CardHeader>
      <CardBody className="text-center mt-2">
        <p className="font-medium">
          The page you are looking for isn&apos;t found!
        </p>
      </CardBody>
      <CardFooter>
        <Button size="small" onClick={() => router.back()}>
          Back
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardNotFound;
