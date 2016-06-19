export const hasReachedBottom = (el, DEFAULT_OFFSET = 0) => {
  const scrollTop = el.scrollTop;
  const scrollHeight = el.scrollHeight;
  const containerHeight = el.offsetHeight;
  return ((containerHeight + scrollTop + DEFAULT_OFFSET) > (scrollHeight));
};