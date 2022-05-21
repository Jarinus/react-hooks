import { useEffect, useRef } from 'react'
import { OnMount } from './types/OnMount'
import { OnDismount } from './types/OnDismount'

function hasOnMountCallback(instance: any): instance is OnMount {
  return typeof instance === 'object'
    && 'onMount' in instance
    && typeof (instance as OnMount).onMount === 'function'
}

function hasOnDismountCallback(instance: any): instance is OnDismount {
  return typeof instance === 'object'
    && 'onDismount' in instance
    && typeof (instance as OnDismount).onDismount === 'function'
}

/**
 * `useInstance` instantiates the given class exactly once when the hook is first called. Subsequent renders will keep
 * the same instance.
 */
export default function useInstance<T>(InstanceClass: new () => T): T {
  const ref = useRef<T>()

  if (ref.current == null) {
    ref.current = new InstanceClass()
  }

  const instance = ref.current!

  useEffect(() => {
    if (hasOnMountCallback(instance)) {
      instance.onMount()
    }

    return () => {
      if (hasOnDismountCallback(instance)) {
        instance.onDismount()
      }
    }
  }, [])

  return instance
}
