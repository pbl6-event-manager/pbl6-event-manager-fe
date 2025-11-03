import { Button } from "../../../components/ui/button"
export function VoucherListPage() {
    return(
        <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">Vouchers</h1>
                  <Button
                    className="bg-[#f05537] hover:bg-[#d63c1f] text-white"
                  >
                    Add more vouchers
                  </Button>
                </div>
    )
}