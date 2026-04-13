import Header from './components/Navbar'
import Hero from './components/Hero'
import Feature1 from './components/Features1'
import Feature2 from './components/Feature2'
import { useMyDesigns } from '../../hooks/useMyDesigns'

function Home() {
  const { } = useMyDesigns()
  return (
      <div className='w-full h-full relative overflow-x-hidden' style={{scrollbarWidth:"none"}} >

          <Header />
          <Hero />
          <Feature1/>
          <Feature2/>
    </div>
  )
}

export default Home
