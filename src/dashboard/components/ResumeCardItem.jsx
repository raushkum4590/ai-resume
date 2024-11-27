import { MoreVertical, Notebook } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import GlobalApi from "./../../../service/GlobalApi";

const ResumeCardItem = ({ resume }) => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);

  const onDelete = () => {
    GlobalApi.DeleteResumeByID(resume.documentId)
      .then(() => {
        console.log("Resume deleted successfully");
        setOpenAlert(false); // Close the alert dialog
        // Optionally refresh or navigate
      })
      .catch((error) => {
        console.error("Error deleting resume:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-[320px] w-[200px] border rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105">
      {/* Notebook Icon - Link to Edit */}
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div className="p-14 bg-secondary flex items-center justify-center h-[280px] w-[200px] border border-primary rounded-lg gap-5">
          <Notebook />
        </div>
      </Link>

      {/* Title and Dropdown */}
      <div className="flex items-center justify-between w-full px-2">
        <span className="text-sm font-medium text-primary">{resume.title}</span>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center">
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-2">
            <DropdownMenuItem
              onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem>Download</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setOpenAlert(true)}
              className="text-red-500 hover:bg-red-100"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Alert Dialog */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your resume and remove its data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResumeCardItem;
