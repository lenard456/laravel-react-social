import Routes from './routes'
import { RecoilRoot, useRecoilCallback } from 'recoil'
import { Button } from 'antd'

function DebugButton() {
    const onClick = useRecoilCallback(({snapshot}) => async () => {
      console.debug('Atom values:');
      for (const node of snapshot.getNodes_UNSTABLE()) {
        const value = await snapshot.getPromise(node);
        console.debug(node.key, value);
      }
    }, []);
  
    return <Button className='fixed right-8 bottom-8' onClick={onClick}>Dump State</Button>
}

export default function() {
    return (
        <RecoilRoot>
            <Routes />
            <DebugButton />
        </RecoilRoot>
    )
}