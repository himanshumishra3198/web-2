import { Button } from "./components/Button";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { Card } from "./components/Card";
import { CreateContentModel } from "./components/CreateContentModel";
import { useState } from "react";

function App() {
  function handleClick() {
    console.log("I am clicked");
  }
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-4">
      <CreateContentModel
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
      <div className="flex justify-end gap-4">
        <Button
          variant="primary"
          text="Add content"
          onClick={() => {
            setModalOpen(true);
          }}
          startIcon={<PlusIcon size="sm" />}
        />
        <Button
          variant="secondary"
          text="Share thought"
          onClick={handleClick}
          startIcon={<ShareIcon size="sm" />}
        />
      </div>
      <div className="flex gap-4">
        <Card
          link="https://x.com/BasedMikeLee/status/1874704934421365194"
          title="Elon Musk"
          type="twitter"
        />
        <Card
          link="https://www.youtube.com/watch?v=O56XHtdUc5M"
          title="magnum"
          type="youtube"
        />
      </div>
    </div>
  );
}

export default App;
