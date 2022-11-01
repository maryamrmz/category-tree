export interface CategoryProps {
    parent_id: number | null;
    id: number;
    name: string;
    type: "folder" | "file";
}
