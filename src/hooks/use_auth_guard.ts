import { withPageAuthRequired } from '@auth0/nextjs-auth0'

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {}
  }
})