import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MarqueeText from './MarqueeText.vue'

const items = ['NEWS', 'UPDATES', 'LATEST']

const factory = (props: Partial<InstanceType<typeof MarqueeText>['$props']> = {}) =>
  mount(MarqueeText, {
    props: { items, ...props },
  })

describe('MarqueeText', () => {
  it('не рендерится, если items пустой', () => {
    const wrapper = mount(MarqueeText, { props: { items: [] } })
    expect(wrapper.find('.marquee').exists()).toBe(false)
  })

  it('не рендерится, если items не передан', () => {
    const wrapper = mount(MarqueeText, { props: {} })
    expect(wrapper.find('.marquee').exists()).toBe(false)
  })

  it('рендерит контейнер с aria-label по умолчанию', () => {
    const wrapper = factory()
    const root = wrapper.get('.marquee')
    expect(root.attributes('aria-label')).toBe('Scrolling text')
    expect(root.attributes('tabindex')).toBe('0')
  })

  it('пробрасывает кастомный ariaLabel', () => {
    const wrapper = factory({ ariaLabel: 'Партнёры' })
    expect(wrapper.get('.marquee').attributes('aria-label')).toBe('Партнёры')
  })

  it('дублирует список для бесшовной прокрутки и помечает второй aria-hidden', () => {
    const wrapper = factory()
    const lists = wrapper.findAll('.marquee__track > ul')
    expect(lists).toHaveLength(2)
    expect(lists[0]!.attributes('aria-hidden')).toBeUndefined()
    expect(lists[1]!.attributes('aria-hidden')).toBe('true')
  })

  it('рендерит все items в каждой копии', () => {
    const wrapper = factory()
    const lis = wrapper.findAll('li')
    expect(lis).toHaveLength(items.length * 2)
    const texts = lis.map(li => li.text())
    items.forEach(item => {
      expect(texts.filter(t => t.includes(item))).toHaveLength(2)
    })
  })

  it('корректно работает с дублирующимися items (без коллизии key)', () => {
    const dup = ['NEWS', 'NEWS', 'UPDATES']
    const wrapper = mount(MarqueeText, { props: { items: dup } })
    expect(wrapper.findAll('li')).toHaveLength(dup.length * 2)
  })

  it('применяет animation-duration из speed через CSS-переменную v-bind', () => {
    const wrapper = factory({ speed: 12 })
    const html = wrapper.html()
    expect(html).toMatch(/12s/)
  })

  it('зажимает speed снизу до 1s (при 0 и отрицательном)', () => {
    const zero = factory({ speed: 0 })
    expect(zero.html()).toMatch(/1s/)

    const neg = factory({ speed: -5 })
    expect(neg.html()).toMatch(/1s/)
  })

  it('реверс направления переключает значение animation-direction', () => {
    const normal = factory({ reverse: false })
    const reversed = factory({ reverse: true })
    expect(normal.html()).toContain('normal')
    expect(reversed.html()).toContain('reverse')
  })

  it('декоративная точка-разделитель помечена aria-hidden', () => {
    const wrapper = factory()
    const dots = wrapper.findAll('li > span[aria-hidden="true"]')
    expect(dots.length).toBe(items.length * 2)
  })
})
