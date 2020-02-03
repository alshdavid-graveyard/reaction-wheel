import rw from '../src'

const values = {
  one: 'one',
  two: 'two',
  three: 'three',
  four: 'four'
}

const options: rw.CreateOptions = {
  mutationStrategy: rw.MustationStrategy.PROXY
}

it('Update on shallow change', done => {
  const target = { a: values.one }
  const target$ = rw.create(target, options)

  target$.subscribe(() => {
    expect(target$.a).toBe(values.two)
    done()
  })
  
  target$.a = values.two
})

it('Update on deep change', done => {
  const target = { a: { b: values.one } }
  const target$ = rw.create(target, options)

  target$.subscribe(() => {
    expect(target$.a.b).toBe(values.two)
    done()
  })
  target$.a.b = values.two
})

it('Update on array push', done => {
  const target: string[] = []
  const target$ = rw.create(target, options)

  target$.subscribe(() => {
    expect(target$.length).toBe(1)
    expect(target$[0]).toBe(values.one)
    done()
  })

  expect(target$.length).toBe(0)
  target$.push(values.one)
})

it('Update on array item mutation', done => {
  const target = [{ a: values.one }]
  const target$ = rw.create(target, options)

  target$.subscribe(() => {
    expect(target$[0].a).toBe(values.two)
    done()
  })

  target$[0].a = values.two
})

it('Dont emit unless item has mutated', done => {
  const target = { a: values.one }
  const target$ = rw.create(target, options)

  target$.subscribe(() => {
    expect(target$.a).toBe(values.two)
    done()
  })

  target$.a = values.one
  expect(target$.a).toBe(values.one)
  target$.a = values.two
  expect(target$.a).toBe(values.two)
})

it('Dont emit unless item has mutated', done => {
  const a = {}
  const b = {}
  const target = { a }
  const target$ = rw.create(target, options)

  target$.subscribe(() => {
    expect(target$.a).toEqual(b)
    done()
  })

  target$.a = a
  expect(target$.a).toEqual(a)
  target$.a = b
  expect(target$.a).toEqual(b)
})

it('Emit on mutatation after item pushed to array', done => {
  const target = [{ a: values.one }]
  const target$ = rw.create(target, options)

  target$.push({ a: values.two})

  target$.subscribe(() => {
    expect(target$[1].a).toEqual(values.three)
    done()
  })

  target$[1].a = values.three
})