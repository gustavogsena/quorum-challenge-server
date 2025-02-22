import 'reflect-metadata';
import { GetBillsDTO } from '@src/modules/bills/dtos/getBills.dto';
import { AddressInfo } from 'net';
import { expect, describe, it, beforeEach, vitest, afterAll, beforeAll } from "vitest";

// Skip for get precise coverage on unit tests
describe('API Users Integration Suite', () => {
    function waitForServerStatus(server: any) {
        return new Promise((resolve, reject) => {
            server.once('error', (err: any) => reject(err))
            server.once('listening', () => resolve(true))
            server.once('mount', () => resolve(server))
        });
    }

    beforeEach(() => {
        vitest.resetAllMocks();
    });

    describe('Integration Tests for Server in a non-test environment', () => {
        it('should start server with PORT 4000', async () => {
            const PORT = 4000;
            const HOST = '0.0.0.0'
            process.env.NODE_ENV = 'production';
            process.env.SERVER_PORT = String(PORT);
            process.env.SERVER_HOST = HOST;

            vitest
                .spyOn(
                    console,
                    console.log.name as 'log'
                )

            const { server } = await import('../src/index');

            await waitForServerStatus(server);

            const serverInfo = server.address() as AddressInfo;
            expect(serverInfo.port).toBe(PORT);
            expect(console.log).toHaveBeenCalledWith(`Server started on ${HOST}:${PORT}`);

            return new Promise(resolve => server.close(resolve))
        }, 10_000);
    });

    describe('Integration Tests for Server', () => {
        const DEFAULT_CONFIG = {
            limit: 1
        }

        let _testServer: any;
        let _testServerAdress: string;

        function getBills(params?: GetBillsDTO) {
            return fetch(`${_testServerAdress}/bills/?${params?.limit ? `limit=${params.limit}&` : ''}${params?.offset ? `offset=${params?.offset}` : ''}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

        beforeAll(async () => {
            process.env.NODE_ENV = 'test'

            vitest.useFakeTimers({
                now: new Date('2023-11-23T00:00')
            })
            const HOST = '0.0.0.0'

            const { default: app } = await import('../src/index')

            _testServer = app.listen()
            await waitForServerStatus(_testServer)
            const serverInfo = _testServer.address()
            _testServerAdress = `http://${HOST}:${serverInfo.port}`
            console.log(`Server started on ${_testServerAdress}`)
        })

        afterAll(async () => {
            vitest.useRealTimers()
            await new Promise<void>(resolve => _testServer.close(() => resolve()));
        })

        it('should get bills from server', async () => {
            const response = await getBills({ limit: DEFAULT_CONFIG.limit })
            expect(response.status).toBe(200)
            const json = await response.json()
            expect(json.data.length).toBeLessThanOrEqual(DEFAULT_CONFIG.limit)

        }, 2_000)
    })
})

