"use client";

import Link from "next/link";

import {
  Code2,
  FileQuestion,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";

import { useGetQuestions } from "@/hooks/useQuestion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ProblemBankPage() {
  const { data, isLoading } = useGetQuestions();

  const questions = data?.data ?? [];

  const mcqCount = questions.filter(
    (question: any) => question.type === "MCQ",
  ).length;

  const writtenCount = questions.filter(
    (question: any) => question.type === "WRITTEN",
  ).length;

  const codingCount = questions.filter(
    (question: any) => question.type === "CODING",
  ).length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Problem Bank
          </h1>

          <p className="text-sm text-muted-foreground">
            Create and manage questions for your assessments.
          </p>
        </div>

        <Button
          render={
            <Link href="/dashboard/problem-bank/create" />
          }
        >
          <Plus className="mr-2 size-4" />
          Create Question
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-primary/10 p-3">
              <FileQuestion className="size-5 text-primary" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Questions
              </p>

              <p className="text-2xl font-semibold">
                {questions.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-primary/10 p-3">
              <FileQuestion className="size-5 text-primary" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                MCQ
              </p>

              <p className="text-2xl font-semibold">
                {mcqCount}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-primary/10 p-3">
              <Code2 className="size-5 text-primary" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Coding
              </p>

              <p className="text-2xl font-semibold">
                {codingCount}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-primary/10 p-3">
              <FileQuestion className="size-5 text-primary" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Written
              </p>

              <p className="text-2xl font-semibold">
                {writtenCount}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Question Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle>All Questions</CardTitle>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  placeholder="Search questions..."
                  className="pl-9 sm:w-[280px]"
                />
              </div>

              <Button variant="outline">
                <Filter className="mr-2 size-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Loading questions...
            </div>
          ) : questions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FileQuestion className="mb-4 size-10 text-muted-foreground" />

              <h3 className="text-lg font-semibold">
                No questions found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Create your first question for the problem bank.
              </p>

              <Button
                className="mt-4"
                render={
                  <Link href="/dashboard/problem-bank/create" />
                }
              >
                <Plus className="mr-2 size-4" />
                Create Question
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="px-4 py-3 font-medium">
                      Question
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Type
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Category
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Difficulty
                    </th>

                    <th className="px-4 py-3 font-medium">
                      Marks
                    </th>

                    <th className="px-4 py-3 text-right font-medium">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {questions.map((question: any) => (
                    <tr
                      key={question.id}
                      className="border-b last:border-0 hover:bg-muted/40"
                    >
                      <td className="px-4 py-4">
                        <div className="max-w-[360px]">
                          <p className="font-medium">
                            {question.title}
                          </p>

                          <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                            {question.description}
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
                          {question.type}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-sm">
                        {question.category}
                      </td>

                      <td className="px-4 py-4 text-sm">
                        {question.difficulty}
                      </td>

                      <td className="px-4 py-4 text-sm">
                        {question.marks}
                      </td>

                      <td className="px-4 py-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}