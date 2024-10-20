"use client";

import { useRouter } from "next/navigation";
// Default path does not work but manually changing it to this does.

export default function CharacterList(props) {
  const router = useRouter();
  function handleClick() {
    console.log("hi");
    router.push(`/${props.username}/characters/${props.character_name}/${props.default_class}/`);
    // for some reason redirect doesnt want to work.
  }
  return (
    <div className="hover:underline hover:text-gray-500 hover:cursor-pointer" onClick={handleClick}>
      {props.character_name}
    </div>
  );
}
