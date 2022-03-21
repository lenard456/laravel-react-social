import { sleep } from '@utils/Http'

export default function {
    login: async(state = 'ERROR_VALIDATION') => {
        await sleep(3000)
        switch (state) {
            case: 'ERROR_VALIDATION':
                throw {
                    error: { status: 422, data: {
                        errors: {
                            email: {
                                messages: ['Test']
                            }
                        }
                    }}
                }
        }
    }
}