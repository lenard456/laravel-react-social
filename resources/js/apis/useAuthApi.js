import testApi from './useAuthApi.test'

export default function useAuthApi(live = true)
{

    if (!live) return testApi();

    return {
        login
    }
}