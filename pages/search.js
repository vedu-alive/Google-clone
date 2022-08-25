import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../components/Header";
import SearchReasults from "../components/SearchReasults";
import { API_KEY, CONTEXT_KEY } from "../keys";
import Response from "../Response";

function Search({ results }) {
  const router = useRouter();
  console.log(results);
  return (
    <div>
      <Head>
        <title>{router.query.term} - Google Search</title>
      </Head>

      <Header />
      <SearchReasults results={results} />
    </div>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const useDummyData = false; //for dummy data set it to (true) and it will fetch data from response.js coz google api allows only 100 searches in 1 day

  const startIndex = context.query.start || "0";

  const data = useDummyData
    ? Response
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`
      ).then((res) => res.json());

  //Passing the result to the client
  return {
    props: {
      results: data,
    },
  };
}
