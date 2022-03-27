import { Skeleton } from "antd"

export default () => (
    <>
        <div className='h-60 lg:h-80 bg-gray-500 relative'>
        </div>

        <div className='max-w-5xl mx-auto -translate-y-28'>
            <div className='flex flex-col items-center lg:items-end gap-4 lg:flex-row translate'>
                <Skeleton.Avatar className='bg-white rounded-full' size={224} active />
                <div className='flex flex-grow gap-4 flex-col'>
                    <div className='flex justify-between'>
                        <Skeleton.Input size='large' active />
                        <Skeleton.Button size='large' shape='round' active />
                    </div>
                    <Skeleton.Input size='small' active/>
                </div>
            </div>
        </div>
    </>
)