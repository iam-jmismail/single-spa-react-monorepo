import "core-js/stable";
import "regenerator-runtime/runtime";

import { Header } from "@shared/components/Header";

export default function Root(props) {
  return (
    <section>
      <Header />
      Hello !
    </section>
  );
}
