import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { useEffect, useState } from "react";
import { SideBar } from "../components/SideBar";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios";

function Dashboard() {
  const { contents, refresh } = useContent();

  async function shareThought() {
    const response = await axios.post(
      BACKEND_URL + "/api/v1/thought/share",
      {
        share: true,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    alert(response.data.hash);
  }
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    refresh();
  }, [modalOpen]);
  return (
    <div>
      <div className="fixed">
        <SideBar />
      </div>
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
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
            onClick={shareThought}
            startIcon={<ShareIcon size="sm" />}
          />
        </div>
        <div className="flex gap-4 flex-wrap p-2">
          {contents.map(({ type, link, title, _id }) => (
            <Card type={type} link={link} title={title} contentId={_id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
