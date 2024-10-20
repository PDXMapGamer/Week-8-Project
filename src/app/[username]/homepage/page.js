import NavBar from "@/app/components/NavBar";

export default function homepage({ params }) {
  return (
    <section>
      <NavBar username={params.username} />
      <h1>Welcome {params.username}</h1>
    </section>
  );
}
