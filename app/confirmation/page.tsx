import KlarnaPayment from '@/components/checkout/payment'
import { getKlarnaOrders } from '@/requests/checkout'

type PageProps = {
    searchParams: { order: string };
  };

export default async function Confirmation({searchParams}: PageProps) {
    const {order} = searchParams

    const response = await getKlarnaOrders(order)

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="w-full flex flex-col gap-1 bg-white p-4 rounded-md">
                <h2 className="text-xl">Orderbekräftelse</h2>
                <p>{order}</p>
                <KlarnaPayment checkoutSession={order} klarnaMarkup={response?.html_snippet}/>
            </div>
        </div>
    )
}