import React from "react";
import { Input, Button } from "@material-tailwind/react";
 
export function InputWithButton() {
  const [email, setEmail] = React.useState("");
  const onChange = ({ target }) => setEmail(target.value);
 
  return (
    <div className="fixed bottom-10 flex w-full my-5 p-5">
      <Input
        type="email"
        label="Write a message"
        value={email}
        onChange={onChange}
        className="pr-20"
        containerProps={{
          className: "min-w-0",
        }}
      />
      <Button
        size="sm"
        color={email ? "red" : "blue-gray"}
        disabled={!email}
        className="rounded"
      >
        <img src="send-alt-1-svgrepo-com.svg" className="w-6"></img>
      </Button>
    </div>
  );
}