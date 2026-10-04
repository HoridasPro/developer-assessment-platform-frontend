// "use client";

// import { useInitiatePayment } from "@/hooks";
// import { useParams, useRouter } from "next/navigation";

// export default function PaymentPage() {
//   const params = useParams();
//   const router = useRouter();

//   const assessmentId = params.assessmentId as string;

//   const { mutate, isPending, isError, error } = useInitiatePayment();

//   const handlePayment = () => {
//     mutate(assessmentId, {
//       onSuccess: (response) => {
//         console.log("Payment response:", response);

//         const paymentUrl = response?.data?.paymentUrl;

//         if (!paymentUrl) {
//           console.error("Payment URL not found");
//           return;
//         }

//         window.location.href = paymentUrl;
//       },
//     });
//   };

//   return (
//     <div className="mx-auto max-w-lg p-6">
//       <div className="rounded-xl border bg-background p-6 shadow-sm">
//         <h1 className="text-2xl font-semibold">Payment</h1>

//         <p className="mt-2 text-sm text-muted-foreground">
//           Complete the payment to publish this assessment.
//         </p>

//         <div className="mt-6 rounded-lg border p-4">
//           <p className="text-sm text-muted-foreground">Assessment ID</p>

//           <p className="mt-1 font-medium">{assessmentId}</p>
//         </div>

//         {isError && (
//           <p className="mt-4 text-sm text-red-500">
//             {error instanceof Error ? error.message : "Payment failed"}
//           </p>
//         )}

//         <button
//           type="button"
//           onClick={handlePayment}
//           disabled={isPending}
//           className="mt-6 w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           {isPending ? "Processing..." : "Proceed to Payment"}
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useInitiatePayment } from "@/hooks";
import { useParams } from "next/navigation";

export default function PaymentPage() {
  const params = useParams();

  const assessmentId = params.assessmentId as string;

  const { mutate, isPending, isError, error } = useInitiatePayment();

  const handlePayment = () => {
    mutate(assessmentId, {
      onSuccess: (response) => {
        console.log("Payment response:", response);

        const checkoutUrl = response?.data?.checkoutUrl;

        if (!checkoutUrl) {
          console.error("Checkout URL not found");
          return;
        }

        window.location.href = checkoutUrl;
      },
    });
  };

  return (
    <div className="mx-auto max-w-lg p-6">
      <div className="rounded-xl border bg-background p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Payment</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Complete the payment to publish this assessment.
        </p>

        <div className="mt-6 rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Assessment ID</p>

          <p className="mt-1 font-medium">{assessmentId}</p>
        </div>

        {isError && (
          <p className="mt-4 text-sm text-red-500">
            {error instanceof Error ? error.message : "Payment failed"}
          </p>
        )}

        <button
          type="button"
          onClick={handlePayment}
          disabled={isPending}
          className="mt-6 w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
}
