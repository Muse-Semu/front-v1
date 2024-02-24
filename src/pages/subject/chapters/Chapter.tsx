import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CircleFadingPlus, Edit } from "lucide-react";
import { chapterFields } from "./chapterColumns";
import { useState } from "react";
import { toast } from "react-toastify";
import { addChapter } from "@/api/APIService";
import { access_token } from "@/redux/authenticationSlice";

export function Chapter({ chapter, type }) {
  const [formData, setFormData] = useState({
    ...chapter,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log("It us for cRRRRRr");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "new") {
      try {
        await addChapter(formData, access_token).then((res) => {
          if (res.status === 200) {
            toast.success("Chapter Added Successfully", { autoClose: 1000 });
          } else if (res.status == 403) {
            toast.error("Un authorized");
          }
        });
      } catch (error) {
        toast.error("Error" + error);
      }

      console.log(formData);
    } else if (type === "edit") {
      toast.success("It is " + type);
    } else if (type === "onSubject") {
      toast.success("Updated");
    }
  };
  return (
    <Dialog >
      <DialogTrigger asChild>
        <button className="">
          {chapter && chapter?.chapter ? <Edit /> : <CircleFadingPlus />}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] shadow-md  bg-gray-600 text-white font-bold">
        <DialogHeader className="">
          <DialogTitle>
            {chapter && chapter?.chapter ? (
              <div>
                Edit Grade {chapter.grade}-{chapter.subject.title}- Chapter -{" "}
                {chapter.chapter}
              </div>
            ) : (
              <h3>
                Add Chapter On{" "}
                {chapter.grade != null ? "Grade - " + chapter.grade : ""} -{" "}
                {chapter.subject?.title}{" "}
              </h3>
            )}{" "}
          </DialogTitle>
          <DialogDescription>
            Make changes to this chapter here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          {chapterFields.map((field) => (
            <div
              key={field.field}
              className="grid grid-cols-4 items-center gap-4"
            >
              <Label htmlFor="name" className="text-right">
                {field.label}
              </Label>
              <input
                type={field.type}
                id={field.field}
                name={field.field}
                value={formData[field.field] || ""}
                onChange={handleChange}
                required={field.required}
                className="form-input col-span-3"
              />
            </div>
          ))}

          <DialogFooter>
            {
              <Button className="" type="submit">
                {chapter.chapter ? "Save Changes" : "Add"}
              </Button>
            }
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
