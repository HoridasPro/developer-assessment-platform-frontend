"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import CreateAssessmentForm from "../../_components/createAssessmentForm/createAssessmentForm";

const CreateAssessmentPage = () => {
  return (
    <div className="min-h-screen bg-muted/30 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Button
             variant="ghost"
            size="sm"
            className="-ml-2 mb-3"
            render={<Link href="/dashboard/assessments" />}
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to Assessments
          </Button>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Create Assessment
            </h1>

            <p className="text-sm leading-6 text-muted-foreground sm:text-base">
              Create a new assessment for your candidates.
            </p>
          </div>
        </div>

        {/* Form */}
        <CreateAssessmentForm />
      </div>
    </div>
  );
};

export default CreateAssessmentPage;
