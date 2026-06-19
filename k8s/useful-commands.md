# ☸️ Useful Kubernetes Commands

## View Everything
```bash
kubectl get all -n ecommerce              # all resources
kubectl get pods -n ecommerce             # pods status
kubectl get services -n ecommerce         # services
kubectl get deployments -n ecommerce      # deployments
kubectl get ingress -n ecommerce          # ingress rules
kubectl get hpa -n ecommerce              # autoscalers
```

## Debugging
```bash
# See pod logs
kubectl logs -f deployment/backend -n ecommerce
kubectl logs -f deployment/frontend -n ecommerce

# SSH into a pod
kubectl exec -it deployment/backend -n ecommerce -- /bin/sh

# Run Django commands inside pod
kubectl exec -it deployment/backend -n ecommerce -- python manage.py createsuperuser
kubectl exec -it deployment/backend -n ecommerce -- python manage.py migrate

# Describe a pod (shows errors)
kubectl describe pod <pod-name> -n ecommerce
```

## Scaling
```bash
# Scale manually
kubectl scale deployment backend --replicas=3 -n ecommerce
kubectl scale deployment frontend --replicas=3 -n ecommerce

# View HPA (auto-scaling)
kubectl get hpa -n ecommerce
```

## Rollout
```bash
# Check rollout status
kubectl rollout status deployment/backend -n ecommerce

# Rollback to previous version
kubectl rollout undo deployment/backend -n ecommerce

# View rollout history
kubectl rollout history deployment/backend -n ecommerce
```

## Apply / Delete
```bash
# Apply all manifests
kubectl apply -f k8s/base/

# Delete everything
kubectl delete namespace ecommerce
```

## Monitor Resources
```bash
kubectl top pods -n ecommerce
kubectl top nodes
```
