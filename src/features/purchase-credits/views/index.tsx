
import ModalComponent, { useModalComponent } from '@/components/molecules/ModalComponent'
import { BuyTokenResponse } from '@/pages/api/buy-token'

export default function PurchaseCreditsView({availableTokens}: {availableTokens: number}) {
  let { isOpen } = useModalComponent()

  function handleOpenModal() {
    isOpen = !isOpen
  }

  async function handleBuyTokens() {
    // TODO: move this logic into UseCase
    const response = await fetch('/api/buy-token', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    })

    const json = await response.json() as BuyTokenResponse
    window.location.href = json.data?.session.url || ''
  }

  return (
    <div className='flex gap-3 mt-1 text-muted'>
      <p>you have: {availableTokens} credits</p>

      <ModalComponent
        title='buy credits'
        description="on proceed you'll be redirected to the payment gateway to finish your purchase."
        trigger={
          <button className='underline hover:underline' onClick={handleOpenModal}>
            buy more
          </button>
        }
      >
        <div className='flex gap-5 mt-10'>
          <button className='btn' onClick={handleBuyTokens}>ok</button>
        </div>
      </ModalComponent>
    </div>
  )
}
