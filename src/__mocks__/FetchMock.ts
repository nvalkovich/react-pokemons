global.fetch = jest.fn((data) =>
  Promise.resolve({
    json: () => Promise.resolve(data),
  })
) as jest.Mock;
