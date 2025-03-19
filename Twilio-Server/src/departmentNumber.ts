import axios from "axios";

export async function fetchDepartmentNumber(
  department: "sales" | "support",
): Promise<string | null> {
  try {
    const response = await axios.get(
      `${process.env.BACK_URL}?forward=${department}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        },
      },
    );

    if (response.data && response.data.forward) {
      return response.data.forward;
    }
    return null;
  } catch (error) {
    console.error("Error fetching department number:", error);
    return null;
  }
}
