import { Button } from '@/components/ui/button.tsx';
import { Link } from 'react-router-dom';

const Home = () => {
  return  <div  className="grid place-items-center h-[75vh]">
      <div>
        <h2 className="text-3xl text-center mb-3">Home Page</h2>
        <Link to="/profile" className="mx-auto block w-fit"><Button>Profile</Button></Link>
      </div>
    </div>;
}
export default Home