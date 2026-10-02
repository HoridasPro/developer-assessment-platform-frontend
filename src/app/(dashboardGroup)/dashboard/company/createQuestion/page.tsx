import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import CreateQuestionForm from "../../_components/createQuestionForm/createQuestionForm";

const CreateQuestionPage = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          render={<Link href="/dashboard/problem-bank" />}
        >
          <ArrowLeft className="size-4" />
        </Button>

        <div>
          <h1 className="text-2xl font-semibold">Create Question</h1>

          <p className="text-sm text-muted-foreground">
            Add a new question to your problem bank.
          </p>
        </div>
      </div>

      {/* Form */}
      <CreateQuestionForm />
    </div>
  );
};
export default CreateQuestionPage;
