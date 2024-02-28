import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CircleFadingPlusIcon, Edit } from 'lucide-react';
import React, { useState } from 'react'
import { columns } from './Columns';
import { Label } from 'recharts';
import { Button } from '@/components/ui/button';

const UpdateUser = (editbaleUser) => {
  const [formData,setFormData] = useState({
    ...editbaleUser
  })
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...editbaleUser, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
     
    };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="">
          {editbaleUser && editbaleUser?.email ? <Edit /> : <CircleFadingPlusIcon />}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] shadow-md  bg-gray-600 text-white font-bold">
        <DialogHeader className="">
          <DialogTitle>
            {editbaleUser && editbaleUser?.email ? (
              <div>
                Edit Grade {editbaleUser.grade}-{editbaleUser.subject.title}- editbaleUser -{" "}
                {editbaleUser.email}
              </div>
            ) : (
              <h3>
                Add editbaleUser On{" "}
                {editbaleUser.grade != null ? "Grade - " + editbaleUser.grade : ""} -{" "}
                {editbaleUser.subject?.title}{" "}
              </h3>
            )}{" "}
          </DialogTitle>
          <DialogDescription>
            Make changes to this editbaleUser here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          {columns.filter((field)=>(field.field!="id" && field!="")).map((field) => (
            <div
              key={field.field}
              className="grid grid-cols-4 items-center gap-4"
            >
              <Label  className="text-right">
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
                {editbaleUser.email ? "Save Changes" : "Add"}
              </Button>
            }
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateUser