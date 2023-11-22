import GameSavingLoader from "../GameSavingLoader.js";
import read from "../reader.js";

jest.mock('../reader.js');

beforeEach(() => {
	jest.resetAllMocks();
});

test("resolved promise", () => {
	const rejectedValue = new Promise((resolve) => {

		const data = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
    const buffer = new ArrayBuffer(data.length * 2);
    const bufferView = new Uint16Array(buffer);
    
    for (let i = 0; i < data.length; i++) {
      bufferView[i] = data.charCodeAt(i);
    }
    resolve(buffer);
  });

	read.mockReturnValue(rejectedValue);

	const received = GameSavingLoader.load();
	const expected = {"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}};
	
	return expect(received).resolves.toEqual(expected);

})


test("rejected promise", async () => {
	const rejectedValue = new Promise((resolve, reject) => {
		reject(new Error("Ошибка чтения"));
	});

	read.mockReturnValue(rejectedValue);

	const received = await GameSavingLoader.load();
	const expected = new Error ("Ошибка чтения");

	await expect(received).toEqual(expected);

})