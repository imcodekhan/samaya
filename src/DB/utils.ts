import { getDatabase, ref, set, get, child } from "firebase/database";
import { TaskType } from "../Components/Task";

export const readTasksFromDB = async () => {
  try {
    const db = getDatabase();
    const dbRef = ref(db);

    return get(child(dbRef, "tasks")).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
    });
  } catch (error) {
    console.error("Error reading list from database:", error);
    return [];
  }
};

export const writeTaskToDB = async (task: TaskType): Promise<void> => {
  try {
    const db = getDatabase();
    await set(ref(db, "tasks/" + task.id), { ...task });
  } catch (error) {
    console.error("Error writing list to database:", error);
  }
};
