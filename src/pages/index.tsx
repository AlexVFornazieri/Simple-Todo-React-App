import type { NextPage } from 'next'
import { Footer } from '@/components/Footer'
import { TodoList } from '@/components/TodoList'

const Home: NextPage = () => {
  return (
    <div>
    <TodoList />
    <Footer />
    </div>
  )
}

export default Home
