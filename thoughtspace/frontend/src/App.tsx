import { Button } from "./components/Button";
import { PlusIcon } from "./icons/PlusIcon";

function App() {
  function handleClick() {
    console.log("I am Clicked!");
  }
  return (
    <div className="flex flex-center">
      <Button
        size="sm"
        text="Add Content"
        variant="primary"
        startIcon={<PlusIcon size="sm" />}
        onClick={handleClick}
      />
      <Button
        size="sm"
        text="Add Content"
        variant="secondary"
        startIcon={<PlusIcon size="sm" />}
        onClick={handleClick}
      />
      <Button
        size="lg"
        text="Add Content"
        variant="primary"
        startIcon={<PlusIcon size="lg" />}
        onClick={handleClick}
      />
      <Button
        size="md"
        text="Add Content"
        variant="primary"
        startIcon={<PlusIcon size="md" />}
        onClick={handleClick}
      />
    </div>
  );
}

export default App;
